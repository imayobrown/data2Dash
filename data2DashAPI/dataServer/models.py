from django.db import models

# Create your models here.

class Data(models.Model):
    dataid = models.AutoField(unique=True, primary_key=True)
    user = models.CharField(max_length=45, blank=True)
    dataType = models.CharField(max_length=45, blank=True)
    datetime = models.DateTimeField(blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True)
    data = models.TextField(blank=True)
        
    def __unicode__(self):
        return " id: "+str(self.dataid)+" User: "+self.user+" Data Type: "+self.dataType+" Comment: " + self.comment