from statistics import mode
from django.db import models

# Create your models here.
class Categoria(models.Model):
    categoria = models.CharField(max_length=100)
    
    class Meta:
        verbose_name= "Categoria"
        verbose_name_plural= "Categorias"

    def __str__(self):
        return self.categoria

class Beats(models.Model):
    artist = models.CharField(max_length=200)
    name = models.CharField(max_length=50)
    estallido = models.IntegerField()
    duracion = models.FloatField()
    cambio = models.DecimalField(max_digits=10, decimal_places=3)
    subido = models.DateField(auto_now_add=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    beat = models.FileField(upload_to='media')

    class Meta:
        verbose_name= "Beat"
        verbose_name_plural= "Beats"

    def __str__(self):
        return f"{self.name}  -  {self.artist}"

class contactInformation(models.Model):
    token = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    def __str__(self):
        return f"{self.token}  -  {self.email}"