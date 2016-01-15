from django.conf.urls import include, url
from dataServer import views

urlpatterns = [
    url(r'^data/?$', views.DataList.as_view()),
    url(r'^data/(?P<pk>[0-9]+)/?$', views.DataSet.as_view()),
    url(r'^data/search/?$', views.SearchDataSets.as_view())
]