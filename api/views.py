
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
	return JsonResponse({"test"})

def netid(request):
	if 'netid' in request.session:
		return JsonResponse({'netid': request.session['netid']})
	else:
		return JsonResponse({'netid': ''})


def login(request):
	C = CASClient.CASClient(request)

	auth_attempt = C.Authenticate()
	if "netid" in auth_attempt:  # Successfully authenticated.
		print("successfully authenticted")
		request.session['netid'] = auth_attempt['netid']
		return redirect("https://bixr.herokuapp.com")
	elif "location" in auth_attempt:  # Redirect to CAS.
		return redirect(auth_attempt["location"])
	else:  # This should never happen!
		abort(500)