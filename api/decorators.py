from . import CASClient

def casauth(func):
	if 'netid' in request.session:
		return func
	else:
		return HttpResponseRedirect(reverse('login'))
