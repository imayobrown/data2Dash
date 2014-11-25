from django.db import models

# Create your models here.

from __future__ import unicode_literals

class S2PData(models.Model):
    ids2p_data = models.IntegerField(db_column='ids2p_Data', unique=True) # Field name made lowercase.
    user = models.CharField(max_length=45, blank=True)
    unit = models.CharField(max_length=45, blank=True)
    serial_number = models.CharField(max_length=45, blank=True)
    datetime = models.DateTimeField(blank=True, null=True)
    comment = models.CharField(max_length=255, blank=True)
    data = models.TextField(blank=True)
    class Meta:
        managed = False
        db_table = 's2p_data'