from re import search
from rest_framework import serializers
from searches.models import Search, Result


class SearchSerializer(serializers.ModelSerializer):
    """Serializer for Search object which only allows specifying the sequence"""

    class Meta:
        model = Search
        fields = ['id', 'sequence', 'status', 'started', 'finished']
        read_only_fields = ['status', 'started', 'finished']

    def validate(self, data):
        """Allow only ATCG in search request"""
        if search('[^ATCG]', data["sequence"]) is not None:
            raise serializers.ValidationError({
                      "sequence" : "sequence must contain only nucleic acids: ATCG"
                  })
        return data


class ResultSerializer(serializers.ModelSerializer):
    """Serializer for Result object"""

    class Meta:
        model = Result
        fields = ['id', 'search', 'genome', 'protein', 'start', 'end']
