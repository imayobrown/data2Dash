from django.db import models

# Create your models here.

class Data(models.Model):
    dataid = models.AutoField(unique=True, primary_key=True)
    user = models.CharField(max_length=45, blank=True)
    datetime = models.DateTimeField(blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True)
    data = models.TextField(blank=True)
    class Meta:
        managed = True
        db_table = 's2p_data'
        
    def __unicode__(self):
        return " id: "+str(self.dataid)+" User: "+self.user+" Unit: " + self.unit + " Serial Number: " + self.serial_number + " Comment: " + self.comment