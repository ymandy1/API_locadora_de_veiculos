<template>
	<div class="container">
		<h2>CRUD de Veículos</h2>
		<h3>Adicionar Novo Veículo</h3>
		<div class="input-container">
			<label for="locadora">Locadora:</label>
			<input type="text" placeholder="Locadora" v-model="locadora" />
		</div>
		<div class="input-container">
			<label for="modelo">Modelo:</label>
			<input type="text" placeholder="Modelo" v-model="modelo" />
		</div>
		<div class="input-container">
			<label for="marca">Marca:</label>
			<input type="text" placeholder="Marca" v-model="marca" />
		</div>
		<div class="input-container">
			<label for="ano">Ano:</label>
			<input type="text" min="0" placeholder="Ano" v-model="ano" />
		</div>
		<label for="motor">Motor:</label>
		<div class="input-container">
			<input type="text" placeholder="Motor" v-model="motor" />
		</div>
		<div class="input-container">
			<label for="portas">Portas</label>
			<input type="text" v-model="portas" placeholder="Portas" />
			<div class="input-container">
				<label for="cambio">Câmbio:</label>
				<input type="text" placeholder="Cambio" v-model="cambio" />
			</div>
		</div>
		<div class="input-container">
			<label for="arCondicionado">Ar-Condicionado:</label>
			<input type="checkbox" placeholder="Ar-Condicionado" v-model="arCondicionado" :true-value="true"
				:false-value="false" />
		</div>
		<div class="button-container">
			<button class="Add" @click="save">Adicionar</button>
			<button class="Update" @click="update">Atualizar lista</button>
		</div>
	</div>
	<div class="list">
		<h6>Locadora</h6>
		<h6>Modelo</h6>
		<h6> Marca</h6>
		<h6>Ano</h6>
		<h6>Motor</h6>
		<h6>Portas</h6>
		<h6>Câmbio</h6>
		<h6>Ar-Condicionado</h6>
		<h6>Ações</h6>
	</div>
	<div class="vehicle" v-for="(vehicle, index) in vehicles" :key="index"
		:style="isPar(Number(index)) ? 'background-color: rgb(202, 193, 193)' : 'background-color: light-dark'">
		<p class="locadora">{{ vehicle.locadora }}</p>
		<p class="modelo">{{ vehicle.modelo }}</p>
		<p class="marca">{{ vehicle.marca }}</p>
		<p class="ano">{{ vehicle.ano }}</p>
		<p class="motor">{{ vehicle.motor }}</p>
		<p class="portas">{{ vehicle.portas }}</p>
		<p class="cambio">{{ vehicle.cambio }}</p>
		<p class="ar-condicionado">{{ vehicle.ar_condicionado ? "Possui " : "Não possui" }}</p>
		<div class="button_delete acoes">
			<button class="delete" @click="button_delete(vehicle.id)">Excluir</button>
		</div>
	</div>
</template>

<script lang="js">
import api from "../axios";


export default {
	data() {
		return {
			locadora: ``,
			modelo: ``,
			marca: ``,
			ano: ``,
			motor: ``,
			portas: ``,
			cambio: ``,
			arCondicionado: false,
			vehicles: []
		};
	},
	methods: {
		save() {
			if (
				this.locadora &&
				this.modelo &&
				this.marca &&
				this.ano &&
				this.motor &&
				this.portas &&
				this.cambio &&
				this.arCondicionado !== undefined
			) {
				const vehicleData = {
					locadora: this.locadora,
					modelo: this.modelo,
					marca: this.marca,
					ano: Number(this.ano),
					motor: this.motor,
					portas: Number(this.portas),
					cambio: this.cambio,
					ar_condicionado: this.arCondicionado
				};

				api
					.post("/", JSON.stringify(vehicleData))
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				alert("Por favor, preencha todos os campos.");
			}
		},
		update() {
			api.get("/")
				.then(response => {
					this.vehicles = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		},
		button_delete(id) {
			console.log(id)
			api.delete(`/${id}`)
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error);
				});
		},
		isPar(numero) {
			return numero % 2 === 0;
		}
	}
};
</script>

<style lang="css" scoped>
input[type="text"],
input[type="checkbox"] {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 3px;
	margin-left: 5px
}

input[type="checkbox"] {
	width: auto;
}

label {
	font-weight: 600;
	color: #101010;
	margin-left: 5px;
}

.Update,
.Add {
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	margin-left: 10px;
	margin-top: 10px;
}

button-container button {
	display: block;
	margin-bottom: 10px;
}

button:hover {
	background-color: #0056b3;
}

h2,
h3 {
	color: #101010;
	text-align: left;
	margin-top: auto;
	margin-left: 5px;
}

.vehicle {
	display: flex;
	color: #000;
}

p {
	font-size: 19px;
	padding: 4px;
}

.list {
	display: flex;
	border-bottom: 1px solid #101010;
}

.list h6 {
	padding: 4px;
	font-size: 18px;
	font-weight: bold;
	color: #101010;
	margin-top: 0;
	width: 11%;
	margin-bottom: 0;
}

.vehicle p {
	width: 11%;
}

.button_delete {
	width: 11%;
	display: flex;
	align-items: center;

}

.button_delete button {
	width: 80%;
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
}

.button_delete button:hover {
	background-color: #0056b3;
	color: rgb(202, 193, 193);
}
</style>