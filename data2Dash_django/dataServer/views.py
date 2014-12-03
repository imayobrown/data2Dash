from django.shortcuts import render
from dataServer.models import S2PData 

# Create your views here.


def retrieveData(ids2p_Data):
    """
    This function return the data, corresponding to the provided ids2p_Data integer (which is the primary key of the data), in a string format.
    """
    
    # This line retrieves the data from the database. It is returned as a dictionary with the key being the string "data" and the value being the data in string format.
    dataDictionary = S2PData.objects.values("data").filter(id = ids2p_Data) 
    
    # Here the data string is extracted from the retrieved dictionary.
    dataString = dataDictionary[0]['data']
    
    return dataString