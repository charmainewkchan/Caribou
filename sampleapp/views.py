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
