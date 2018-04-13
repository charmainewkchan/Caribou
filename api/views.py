from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse, HttpResponse
# import datetime

#from django.http import HttpResponse
from django.shortcuts import redirect
from api.models import User, PersonalEvent, ClubEvent
import json
from . import CASClient

# Create your views here.
def test(request):
	response = {
		"test": "this is a message from django!"
	}
	return JsonResponse(response)

def get_user(request, netid):
	user = User.objects.filter(netid=netid)
	user_json = serializers.serialize('json', user)
	return HttpResponse(user_json, content_type='application/json')

def get_events(request):
	data = PersonalEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

def get_event(request, event_id):
	test = 'event_id is: ' + event_id
	# event = get_object_or_404(PersonalEvent, pk=event_id)
	# event_json = serializers.serialize('json', data)
	# test = {}
	# test['text'] = 'hi! this works!'
	# data_json = serializers.serialize('json', test)
	return HttpResponse(test)
	# return HttpResponse(event_json, content_type='application/json')

@csrf_exempt
def post_event(request):
	# get the json data
	data_json = json.loads(request.body)
	data = data_json[0]
	# author
	authornetid = data["author"]
	author = User.objects.get(netid=authornetid)
	# description
	description = data["description"]
	# title
	title = data["title"]
	# location
	location = data["location"]
	# eating_club
	eating_club = data["eating_club"]
	e = PersonalEvent(author = author, description = description, title = title, location = location, eating_club = eating_club)
	e.save()
	# event_json = json.loads(request.body)
	return HttpResponse(e)


def get_club_events(request):
	data = ClubEvent.objects.all()
	data_json = serializers.serialize('json', data)
	return HttpResponse(data_json, content_type='application/json')

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