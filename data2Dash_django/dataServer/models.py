from django.db import models

# Create your models here.

class S2PData(models.Model):
    ids2p_data = models.AutoField(db_column='ids2p_Data', unique=True, primary_key=True) # Field name made lowercase.
    user = models.CharField(max_length=45, blank=True)
    unit = models.CharField(max_length=45, blank=True)
    serial_number = models.CharField(max_length=45, blank=True)
    datetime = models.DateTimeField(blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True)
    data = models.TextField(blank=True)
    class Meta:
        managed = True
        db_table = 's2p_data'
        
    def __unicode__(self):
        return self.comment