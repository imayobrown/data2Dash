from django.conf.urls import patterns, include, url

from django.contrib import admin
from data2Dash.views import home, application_start
from dataServer.views import data_get, userList_get, userEntries_get, userEntry_get
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'data2Dash.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', admin.site.urls),
    url(r'^home/', home),
    url(r'^application_start/', application_start),
    url(r'^data_get/', data_get),
    url(r'^user/$', userList_get),
    url(r'^user/(\w+)/$', userEntries_get),
    url(r'^entry/',userEntry_get),
)
