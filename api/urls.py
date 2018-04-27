from django.urls import re_path, path
from django.conf.urls import re_path
from . import views

urlpatterns = [
	#re_path(r'^$', views.test, name='test'),
	re_path(r'^netid', views.netid),
	path('user/<netid>/', views.get_user), # retrieve json data for user from netid
	re_path(r'^delete_user', views.delete_user),
	re_path(r'^post_event', views.post_event),
	re_path(r'^post_user', views.post_user),
	path('get_users_for_event/<event_id>/', views.get_users_for_event),
	path('event/<event_id>/', views.get_event),
	path('get_events_for_user/<netid>/',views.get_events_for_user),
	re_path(r'^get_events', views.get_events),
	re_path(r'^get_club_events', views.get_club_events),
	re_path(r'^join_event', views.join_event),
	re_path(r'^unjoin_event', views.unjoin_event),
	path('hosted_events/<netid>/', views.hosted_events),
	path('delete_event/<event_id>/', views.delete_event),
]
