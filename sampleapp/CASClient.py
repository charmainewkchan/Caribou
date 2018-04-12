import sys, os, cgi, urllib, re

form = cgi.FieldStorage()

class CASClient:

   def __init__(self, request):
      self.cas_url = 'https://fed.princeton.edu/cas/'
      self.request = request

   def Authenticate(self):
      # If the request contains a login ticket, try to validate it
      if 'ticket' in form:
         netid = self.Validate(form['ticket'].value)
         if netid != None:
            return netid
         return {}
      # No valid ticket; redirect the browser to the login page to get one
      login_url = self.cas_url + 'login' \
         + '?service=' + urllib.parse.quote(self.ServiceURL())

      return {"location": login_url}
      # print ('Location: ' + login_url)
      # print ('Status-line: HTTP/1.1 307 Temporary Redirect')
      # print ("")
      # sys.exit(0)

   def Validate(self, ticket):
      val_url = self.cas_url + "validate" + \
         '?service=' + urllib.parse.quote(self.ServiceURL()) + \
         '&ticket=' + urllib.parse.quote(ticket)
      r = urllib.urlopen(val_url).readlines()   # returns 2 lines
      if len(r) == 2 and re.match("yes", r[0]) != None:
         return r[1].strip()
      return None

   def ServiceURL(self):
      ret = 'http://' + self.request.META['HTTP_HOST'] + self.request.get_full_path()
      ret = re.sub(r'ticket=[^&]*&?', '', ret) # delete ticket info
      ret = re.sub(r'\?&?$|&$', '', ret) # delete
      return ret
      #return "something is badly wrong"

def main():
  print ("CASClient does not run standalone")

if __name__ == '__main__':
  main()