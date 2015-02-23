from django.shortcuts import render
from django.http import HttpResponse
from dataServer.models import S2PData 
import json

# Create your views here.

class Container_S2PData(object):
    """
    This is a container class for retrieving, holding and manipulating the data found in a .s2p file string retrieved from the database.
    
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
    
    # Initialize trace lists. Format for graph trace data Traces = {"Trace1": [[x1,y1],[x2,y2],...],"Trace2": [[x1,y1],[x2,y2],...],...}
    
    Traces = {}
    S11_mag_trace = []
    S11_phase_trace = []
    S21_mag_trace = []
    S21_phase_trace = []
    S12_mag_trace = []
    S12_phase_trace = []
    S22_mag_trace = []
    S22_phase_trace = []
    
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
            
        # Construct traces to be graphed by the front end. 
        
        for index in range(len(self.frequency_list)):
            self.S11_mag_trace.append([self.frequency_list[index],self.S11_mag[index]])
            self.S21_mag_trace.append([self.frequency_list[index],self.S21_mag[index]])
            self.S12_mag_trace.append([self.frequency_list[index],self.S12_mag[index]])
            self.S22_mag_trace.append([self.frequency_list[index],self.S22_mag[index]]) 
            
        self.data['Header'] = header
        self.data['S11 Magnitude'] = self.S11_mag
        self.data['S11 Phase'] = self.S11_phase
        self.data['S21 Magnitude'] = self.S21_mag
        self.data['S21 Phase'] = self.S21_phase
        self.data['S12 Magnitude'] = self.S12_mag
        self.data['S12 Phase'] = self.S12_phase
        self.data['S22 Magnitude'] = self.S22_mag
        self.data['S22 Phase'] = self.S22_phase
        self.Traces = {'S11 Magnitude Trace': self.S11_mag_trace,'S21 Magnitude Trace': self.S21_mag_trace,'S12 Magnitude Trace': self.S12_mag_trace,'S22 Magnitude Trace': self.S22_mag_trace}
        self.data['Traces'] = self.Traces

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
    
    

def data_get(request):
    """
    Function to respond to HTTP request and get data from the database utilizing the Container_S2PData class.
    """
    
    container = Container_S2PData(1)
    data_JSON = container.serializeData_JSON()
    return HttpResponse(data_JSON, content_type="application/json")

def userList_get(request):
    """
    This view generates a json file that is a list of all the unique users located in the database.
    """
    userArray = []
    databaseReturn = S2PData.objects.values("user").distinct()
    for row in databaseReturn:
        userArray.append(row['user'])
    
    userDictionary = {'Users': userArray}
    
    users_JSON = json.dumps(userDictionary, indent=4, sort_keys=True)
    
    return HttpResponse(users_JSON, content_type="application/json")

def userEntries_get(request, user):
    databaseReturn = S2PData.objects.values('ids2p_data','unit','serial_number','datetime','comment').filter(user=user)
    
    entries = []
    
    for row in databaseReturn:
        entry = {'id':'','Unit':'','Serial Number':'','Datetime':'','Comment':''}
        entry['id'] = row['ids2p_data']
        entry['Unit'] = row['unit']
        entry['Serial Number'] = row['serial_number']
        entry['Datetime'] = row['datetime'].strftime('%m/%d/%Y %H:%M:%S')
        entry['Comment'] = row['comment']
        entries.append(entry)
    
    userEntries = {user.replace("_"," "):entries}
    
    userEntries_JSON = json.dumps(userEntries, indent=4, sort_keys=True)
    return HttpResponse(userEntries_JSON, content_type="application/json")
    
    