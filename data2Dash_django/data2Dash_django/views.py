'''
Created on Nov 25, 2014

@author: Ianbrown
'''


from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    html = render(request, "bootstrap_template.html", {})
    return HttpResponse(html)