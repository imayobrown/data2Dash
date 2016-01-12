# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('dataid', models.AutoField(unique=True, serialize=False, primary_key=True)),
                ('user', models.CharField(max_length=45, blank=True)),
                ('datetime', models.DateTimeField(null=True, blank=True)),
                ('comment', models.CharField(max_length=255, blank=True)),
                ('data', models.TextField(blank=True)),
            ],
        ),
    ]
