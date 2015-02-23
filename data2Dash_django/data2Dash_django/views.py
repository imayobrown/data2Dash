'''
Created on Nov 25, 2014

@author: Ianbrown
'''


from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    html = render(request, 'index.html', {})
    return HttpResponse(html)

def application_start(request):
    html = render(request,'dashboard layouts/two-and-one/index.html',{})
    return HttpResponse(html)