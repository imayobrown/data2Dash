from django.conf.urls import patterns, include, url

from django.contrib import admin
from dataServer import urls as dataServer_urls
#from dataServer.views import home, application_start, tableTest
#from dataServer.views import data_get, userList_get, userEntries_get, userEntry_get, addS2P
admin.autodiscover()

urlpatterns = [
    url(r'^', include(dataServer_urls))
]