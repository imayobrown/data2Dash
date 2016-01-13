from rest_framework import serializers
from dataServer.models import Data

class DataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Data
        fields = ('dataid', 'user', 'dataType', 'datetime', 'comment', 'data')
        
        
class DataSearchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Data
        fields = ('dataid', 'user', 'dataType', 'datetime', 'comment')