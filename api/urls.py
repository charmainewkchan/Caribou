from django.urls import re_path, path
from django.conf.urls import re_path
from . import views

urlpatterns = [
	re_path(r'^$', views.test, name='test'),
	re_path(r'^netid', views.netid, name='netid'),
	re_path(r'^post_event', views.post_event, name='post_event'),
	path('event/<int:event_id>/', views.get_event, name='get_event'),
	re_path(r'^get_events', views.get_events, name='get_events'),
	re_path(r'^get_club_events', views.get_club_events, name='get_club_events'),
]