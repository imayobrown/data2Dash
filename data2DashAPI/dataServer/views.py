from django.http import HttpResponse
from django.http import Http404
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from dataServer.models import Data
from dataServer.serializers import DataSearchSerializer, DataSerializer
from dataServer.serializers import DataSearchSerializer
from django.http.request import QueryDict


class DataList(APIView):
    '''
    List all rows in Data table
    '''
    
    def get(self, request, format = None):
        dataList = Data.objects.all()
        serializer = DataSearchSerializer(dataList, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
class DataSet(APIView):
    '''
    Get single data set based on primary key
    '''
    
    def getDataSet(self, pk):
        try:
            return Data.objects.get(dataid = pk)
        except:
            raise Http404
        
    def get(self, request, pk, format = None):
        dataSet = self.getDataSet(pk)
        serializer = DataSerializer(dataSet)
        return Response(serializer.data)
    
class SearchDataSets(APIView):
    '''
    Search the database for datasets given a set of query parameters
    '''
    
    def getDataSets(self, queryDict):
        try:
            querySet = Data.objects.values('id', 'user', 'datetime', 'comment')
        except:
            raise Http404
        
        unit = queryDict.get('id')
        user = queryDict.get('user')
        datetime = queryDict.get('datetime')
        comment = queryDict.get('comment')
        
        if unit is not None:
            querySet = querySet.filter(unit = unit)
        if user is not None:
            querySet = querySet.filter(user = user)
        if datetime is not None:
            querySet = querySet.filter(datetime = datetime)
        if comment is not None:
            querySet = querySet.filter(comment = comment)
            
        return querySet
    
    def get(self, request, format=None):
        querySet = self.getDataSets(request.Get)
        
        try:
            serializer = DataSearchSerializer(querySet, many = True)
            return Response(serializer.data)
        except:
            serializer = DataSearchSerializer(querySet)
            return Response(serializer.data)