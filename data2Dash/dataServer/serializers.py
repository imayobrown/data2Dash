from rest_framework import serializers
from dataServer.models import Data

class DataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Data
        fields = ('dataid', 'user', 'datetime', 'comment', 'data')
        
        
class DataSearchSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Data
        fields = ('dataid', 'user', 'unit', 'serial_number', 'datetime', 'comment')