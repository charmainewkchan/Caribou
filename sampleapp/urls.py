from django.urls import re_path
from . import views

urlpatterns = [
	re_path(r'^$', views.test, name='test'),
	re_path(r'^netid', views.session_id, name='netid')
]