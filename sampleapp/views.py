from django.http import JsonResponse
#from django.http import HttpResponse

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
	C = CASClient.CASClient(request.args)
	auth_attempt = C.Authenticate()
	if "netid" in auth_attempt:  # Successfully authenticated.
		return redirect(...)
	elif "location" in auth_attempt:  # Redirect to CAS.
		return redirect(auth_attempt["location"])
	else:  # This should never happen!
		abort(500)