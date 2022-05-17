from searches.models import Search, Result
from searches.serializers import SearchSerializer, ResultSerializer
from searches.tasks import run_search
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SearchList(APIView):
    """List all searches, or register a new search"""

    def get(self, request, format=None):
        """Get list of searches"""
        searches = Search.objects.all().order_by('-id').prefetch_related('results')
        serializer = SearchSerializer(searches, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        """Register new search with backend"""
        serializer = SearchSerializer(data=request.data)
        if serializer.is_valid():
            search = serializer.save()
            run_search.delay(search.id, search.sequence)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class SearchDetail(APIView):
    """Retrieve and delete searches"""

    def get_object(self, pk):
        """Use primary key to look up search"""
        try:
            return Search.objects.get(pk=pk)
        except Search.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        """Return a single search by id"""
        search = self.get_object(pk)
        serializer = SearchSerializer(search)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        """Delete search and any associated results"""
        search = self.get_object(pk)
        
        # Delete should not be contingent upon completion
        try:
            result = Result.objects.get(search=search)
            result.delete()
            search.delete()
        except Result.DoesNotExist:
            search.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

