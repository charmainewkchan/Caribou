from django.contrib import admin

from api.models import User
from api.models import PersonalEvent
from api.models import JoinedEvents
from api.models import DoNotMail

# Register your models here.
admin.site.register(User)
admin.site.register(PersonalEvent)
admin.site.register(JoinedEvents)
admin.site.register(DoNotMail)