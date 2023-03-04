from django.db import models

class Endereco(models.Model):
    cep = models.CharField(max_length=10)
    bairro = models.CharField(max_length=10)
    rua = models.CharField(max_length=10)
    numero = models.CharField(max_length=10)
    complemento = models.CharField(max_length=10)
    estado = models.CharField(max_length=10)
    cidade = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.bairro} - {self.cidade}'

class Anunciante(models.Model):
    nome = models.CharField(max_length=80)
    telefone = models.CharField(max_length=80)
    email = models.CharField(max_length=200)
    cnpj = models.CharField(max_length=100)
    endereco = models.ForeignKey(Endereco, on_delete=models.DO_NOTHING, null=True, blank=True)
    imagem = models.ImageField(upload_to='imagens', blank=True, null=True)

    def __str__(self):
        return f'{self.id} - {self.nome}'


class HorarioFuncionamento(models.Model):
    seg = models.CharField(max_length=80, null=True, blank=True) 
    ter = models.CharField(max_length=80, null=True, blank=True) 
    qua = models.CharField(max_length=80, null=True, blank=True) 
    qui = models.CharField(max_length=80, null=True, blank=True) 
    sex = models.CharField(max_length=80, null=True, blank=True) 
    sab = models.CharField(max_length=80, null=True, blank=True) 
    dom = models.CharField(max_length=80, null=True, blank=True)

    def __str__(self):
        campos_do_model = self.__dict__
        dias_da_semana = [key for key in campos_do_model.keys() if key not in ['id', '_state']]
        retorno = ''
        for dia_da_semana in dias_da_semana:
            valor = self.__dict__[dia_da_semana]
            if valor:
                retorno += f' {dia_da_semana}: {valor} |'
        return retorno


class Produto(models.Model):
    nome = models.CharField(max_length=80)
    valor = models.FloatField(default=0)
    anunciante = models.ForeignKey(Anunciante, on_delete=models.DO_NOTHING, blank=True, null=True)
    imagem = models.ImageField(upload_to='imagens', blank=True, null=True)
    descricao = models.TextField(max_length=300, blank=True, null=True)

    def __str__(self):
        return f'{self.id} - {self.nome} - {self.anunciante.nome}'

class Servico(models.Model):    
    nome = models.CharField(max_length=80)
    anunciante = models.ForeignKey(Anunciante, on_delete=models.DO_NOTHING, blank=True, null=True)
    horario = models.ForeignKey(HorarioFuncionamento, on_delete=models.DO_NOTHING, null=True, blank=True)
    imagem = models.ImageField(upload_to='imagens', blank=True, null=True)
    descricao = models.TextField(max_length=300, blank=True, null=True)

    def __str__(self):
        return f'{self.id} - {self.nome} - {self.anunciante.nome} - {self.horario}'
