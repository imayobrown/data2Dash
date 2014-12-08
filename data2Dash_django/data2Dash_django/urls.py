from django.conf.urls import patterns, include, url

from django.contrib import admin
from data2Dash_django.views import home, application_start, ajax_test, ajax_info
from dataServer.views import data_get
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'data2Dash.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', admin.site.urls),
    url(r'^home/', home),
    url(r'^application_start/', application_start),
    url(r'^ajax_test/',ajax_test),
    url(r'^ajax_info/',ajax_info),
    url(r'^data_get/', data_get)
)
