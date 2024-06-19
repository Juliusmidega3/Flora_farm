from django.db import models

class Why_us(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=500)

class Testimonials(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='products/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class FeaturedProducts(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Seeds/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class Seeds(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Seeds/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Fruits(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Fruits/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class Fertilizers(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Fertilizers/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Equipment(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Equipment/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Pesticides(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='Pesticides/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class AnimalFeeds(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='AnimalFeeds/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class AgricuturalServices(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='AgricuturalServices/')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


