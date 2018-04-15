# Generated by Django 2.0.3 on 2018-04-14 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20180413_2148'),
    ]

    operations = [
        migrations.AddField(
            model_name='clubevent',
            name='date',
            field=models.CharField(default='yyyy-mm-dd', max_length=10),
        ),
        migrations.AddField(
            model_name='personalevent',
            name='date',
            field=models.CharField(default='yyyy-mm-dd', max_length=10),
        ),
        migrations.AlterField(
            model_name='clubevent',
            name='end_time',
            field=models.CharField(default='hh:mm', max_length=5),
        ),
        migrations.AlterField(
            model_name='clubevent',
            name='start_time',
            field=models.CharField(default='hh:mm', max_length=5),
        ),
        migrations.AlterField(
            model_name='personalevent',
            name='end_time',
            field=models.CharField(default='hh:mm', max_length=5),
        ),
        migrations.AlterField(
            model_name='personalevent',
            name='start_time',
            field=models.CharField(default='hh:mm', max_length=5),
        ),
    ]