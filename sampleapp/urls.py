from django.urls import re_path
<<<<<<< HEAD
from django.conf.urls import re_path
=======
>>>>>>> 5dbe82d919ce101724ed877a177246213babd412
from . import views

urlpatterns = [
	re_path(r'^$', views.test, name='test'),
	re_path(r'^netid', views.netid, name='netid')
<<<<<<< HEAD
]
=======
]
>>>>>>> 5dbe82d919ce101724ed877a177246213babd412
