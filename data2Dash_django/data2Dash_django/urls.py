from django.conf.urls import patterns, include, url

from django.contrib import admin
from data2Dash_django.views import home
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'data2Dash.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', admin.site.urls),
    url(r'^home/', home),
)
