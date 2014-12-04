from django.shortcuts import render
from dataServer.models import S2PData 
import json

# Create your views here.

class Container_S2PData(object):
    """
    This is a container class for retrieving, holding and manipulating the data found in a .s2p file string retrieved fromt he database.
    
    Upon instantiation the a data record is retrieved from the database and manipulated to extract all of the relevant data that it contains
    in order to expose it in a workable format. 
    """
    
    # Initialize frequency list
    frequency_list = [] 
    
    # Initialize S11 data arrays
    S11_mag=[]
    S11_phase=[]
    
    # Initialize S21 data arrays 
    S21_mag=[]
    S21_phase=[]
    
    # Initialize S12 data arrays 
    S12_mag=[]
    S12_phase=[]
    
    # Initialize S22 data arrays 
    S22_mag=[]
    S22_phase=[]
    
    data = {}
    
    def __init__(self, data_id):
        dataString = self.retrieveData(data_id)
        self.extractData(dataString)
        
    def extractData(self, dataString):
        """
        Function is used in the constructor for Container_S2PData. Assigns the object instance values for header and data.
        """
        
        # Splits the dataString into a list of lines. Each row is a data point (except for the first 5 lines which are the file header).
        dataString_splitlines = dataString.splitlines()
    
        # Splits information from dataString into a header component and a data component. This way information can be extracted separately in a uniform manner.
        header = dataString_splitlines[:6] # Header lines from the .s2p file
        rawdata = dataString_splitlines[6:] # Numeric data found in the s2p file
        
        # Extract all of the data and place it into its respective container.
        for point in rawdata:
            dataset = point.split(" ")
            self.frequency_list.append(float(dataset[0]))
            self.S11_mag.append(float(dataset[1]))
            self.S11_phase.append(float(dataset[2]))
            self.S21_mag.append(float(dataset[3]))
            self.S21_phase.append(float(dataset[4]))
            self.S12_mag.append(float(dataset[5]))
            self.S12_phase.append(float(dataset[6]))
            self.S22_mag.append(float(dataset[7]))
            self.S22_phase.append(float(dataset[8]))
            
        self.data['Header'] = header
        self.data['S11 Magnitude'] = self.S11_mag
        self.data['S11 Phase'] = self.S11_phase
        self.data['S21 Magnitude'] = self.S21_mag
        self.data['S21 Phase'] = self.S21_phase
        self.data['S12 Magnitude'] = self.S12_mag
        self.data['S12 Phase'] = self.S12_phase
        self.data['S22 Magnitude'] = self.S22_mag
        self.data['S22 Phase'] = self.S22_phase

    def retrieveData(self, data_id):
        """
        This function return the data, corresponding to the provided ids2p_Data integer (which is the primary key of the data), in a string format.
        """
        
        # This line retrieves the data from the database. It is returned as a dictionary with the key being the string "data" and the value being the data in string format.
        dataDictionary = S2PData.objects.values("data").filter(ids2p_data = data_id) 
        
        # Here the data string is extracted from the retrieved dictionary.
        dataString = dataDictionary[0]['data']
    
        return dataString

    def serializeData_JSON(self):
        data_JSON = json.dumps(self.data, indent=4, sort_keys=True)
        return data_JSON


    