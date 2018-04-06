from django.http import JsonResponse
#from django.http import HttpResponse

# Create your views here.
def test(request):
	response = {
		"test": "this is a message from django!"
	}
	return JsonResponse(response)