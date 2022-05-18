from searches.models import Search, Result
from django.contrib.sessions.models import Session
from searches.serializers import SearchSerializer, ResultSerializer
from searches.tasks import run_search
from django.http import Http404
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


def get_session_key(session):
    """Create Session if needed, then return session_key"""

    if session.session_key is None:
        session.create()

    return session.session_key


class SearchList(APIView):
    """List all searches, or register a new search"""

    def get(self, request, format=None):
        """Get list of searches"""
        session_key = get_session_key(request.session)
        searches = (
            Search.objects.filter(session__pk=session_key)
                          .order_by('-id')
                          .prefetch_related('results')
        )
        serializer = SearchSerializer(searches, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """Register new search with backend"""
        serializer = SearchSerializer(data=request.data)
        if serializer.is_valid():
            session_key = get_session_key(request.session)
            session = Session.objects.get(pk=session_key)
            search = serializer.save(session=session)

            # Try to start search and register error if connection lost
            try:
                run_search.delay(search.id, search.sequence)
            except run_search.OperationalError:
                search.status = Search.ERROR
                search.finished = timezone.now()
                search.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class SearchDetail(APIView):
    """Retrieve and delete searches"""

    def get_object(self, pk, sk):
        """Use primary and session keys to look up search"""
        try:
            return Search.objects.get(pk=pk, session__pk=sk)
        except Search.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """Return a single search by id"""
        session_key = get_session_key(request.session)
        search = self.get_object(pk, session_key)
        serializer = SearchSerializer(search)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        """Delete search and any associated results"""
        session_key = get_session_key(request.session)
        search = self.get_object(pk, session_key)
        search.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

