# Generated by Django 3.2.8 on 2021-10-13 21:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20211013_2050'),
    ]

    operations = [
        migrations.RenameField(
            model_name='newuser',
            old_name='Last_name',
            new_name='last_name',
        ),
    ]
