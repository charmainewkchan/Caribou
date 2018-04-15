from . import CASClient
from django.urls import reverse
from django.shortcuts import redirect
from django.http import HttpResponseRedirect

def casauth(func):
	def wrapper(*args, **kw):
		if 'netid' in args[0].session:
			return func(*args, **kw)
		else:
			return HttpResponseRedirect(reverse('login'))
	return wrapper
