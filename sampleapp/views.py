from django.http import JsonResponse
#from django.http import HttpResponse
from django.shortcuts import redirect

from . import CASClient

# Create your views here.
def test(request):
	response = {
		"test": "this is a message from django!"
	}
	return JsonResponse(response)

def get_events(request):
	# query database for events
	# format as json
	response = {
		"test"
	}
	return JsonResponse(response)


def login(request):
	C = CASClient.CASClient()
	auth_attempt = C.Authenticate()
	if "netid" in auth_attempt:  # Successfully authenticated.
		print("successfully authenticted")
		return redirect("/")
	elif "location" in auth_attempt:  # Redirect to CAS.
		print("redirect to cas: %s" % auth_attempt["location"])
		return redirect(auth_attempt["location"])
	else:  # This should never happen!
		abort(500)