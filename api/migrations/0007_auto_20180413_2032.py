# Generated by Django 2.0.3 on 2018-04-14 00:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20180413_2032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clubevent',
            name='end_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2018, 4, 13, 20, 32, 12, 132709)),
        ),
        migrations.AlterField(
            model_name='clubevent',
            name='start_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2018, 4, 13, 20, 32, 12, 132709)),
        ),
        migrations.AlterField(
            model_name='personalevent',
            name='end_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2018, 4, 13, 20, 32, 12, 131868)),
        ),
        migrations.AlterField(
            model_name='personalevent',
            name='start_time',
            field=models.DateTimeField(verbose_name=datetime.datetime(2018, 4, 13, 20, 32, 12, 131868)),
        ),
    ]
