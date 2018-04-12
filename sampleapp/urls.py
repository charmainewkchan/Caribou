<<<<<<< HEAD
from django.urls import re_path
=======
from django.conf.urls import re_path
>>>>>>> models-test
from . import views

urlpatterns = [
	re_path(r'^$', views.test, name='test'),
<<<<<<< HEAD
	re_path(r'^netid', views.netid, name='netid')
=======
>>>>>>> models-test
]