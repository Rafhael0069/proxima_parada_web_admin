import { collection, getDocs, getFirestore, doc, runTransaction, query, where } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export default (await import('vue')).defineComponent({
data() {
return {
requisitions: [],
dialogConfirmStatusRequest: false,
selectedItem: {
localUser: {
userVehicle: {},
},
},
loading: false,
statusLoading: false,
alertInfo: false,
alertError: false,
alertSuccess: false,
alertMessage: "Erro ao conectar-se ao banco de dados!",
};
},
methods: {
async getAllStatusRequest() {
this.loading = true;
this.requisitions = [];
try {
this.loading = true;

// Cria a query com o filtro "readeRequest" == false
const requisitionsRef = collection(db, "requisitions");
const q = query(requisitionsRef, where("readeRequest", "==", false));

// Executa a query
const querySnapshot = await getDocs(q);

if (querySnapshot.empty) {
this.alertInfo = true;
} else {
this.requisitions = querySnapshot.docs.map(doc => {
const data = doc.data();
return {
idRequisition: data.idRequisition,
localUser: {
email: data.localUser.email,
idUser: data.localUser.idUser,
name: data.localUser.name,
imageLocation: data.localUser.imageLocation,
isDriver: data.localUser.isDriver,
isRequestBeDriveOpen: data.localUser.isRequestBeDriveOpen,
isRequestDenied: data.localUser.isRequestDenied,
phone: data.localUser.phone,
userVehicle: {
brand: data.localUser.userVehicle.brand,
color: data.localUser.userVehicle.color,
imageLocation: data.localUser.userVehicle.imageLocation,
model: data.localUser.userVehicle.model,
plate: data.localUser.userVehicle.plate,
},
},
readeRequest: data.readeRequest,
statusDescriptionDenied: data.statusDescriptionDenied,
statusRequest: data.statusRequest,
};
});
}
} catch (error) {
console.log(error);
this.erroAlert = true;
}
this.loading = false;
console.log('aq', this.requisitions);
},


async updateStatusRequest(status, selectedItem) {
const db = getFirestore();
this.statusLoading = true;
try {
await runTransaction(db, async (transaction) => {
// Referência para o documento na coleção 'requisitions'
const requisitionRef = doc(db, "requisitions", selectedItem.idRequisition);

// Referência para o documento na coleção 'users'
const userRef = doc(db, "users", selectedItem.localUser.idUser);

// Obter os documentos para garantir que eles existem
const requisitionDoc = await transaction.get(requisitionRef);
const userDoc = await transaction.get(userRef);

if (!requisitionDoc.exists() || !userDoc.exists()) {
throw new Error("Os documentos especificados não existem.");
}

// Atualizar os campos na coleção 'requisitions'
transaction.update(requisitionRef, {
"localUser": {
"isDrive": status,
},
"statusRequest": status,
"readeRequest": status,
});

// Atualizar o campo na coleção 'users'
transaction.update(userRef, {
"isDriver": status,
});

});
this.statusLoading = false;
this.dialogConfirmStatusRequest = false;
this.showSuccessAlert(true, "Requisição respondida com sucesso.");
this.getAllStatusRequest();
console.log("Atualização concluída com sucesso!");
} catch (error) {
console.error("Erro ao atualizar as coleções: ", error);
this.statusLoading = false;
this.dialogConfirmStatusRequest = false;
this.showErrorAlert(true, error.response.data.message);
console.log(error.response.data);
}
/*
const data = {
id: this.selectedItem.id,
id_user: this.selectedItem.id_user,
statusDescriptionDenied: this.selectedItem.statusDescriptionDenied,
status: status,
};
try {
const res = await Admin.updateStatusRequest(data);
console.log(res);
this.statusLoading = false;
this.dialogConfirmStatusRequest = false;
this.showSuccessAlert(true, "Requisição respondida com sucesso.");
this.getAllStatusRequest();
} catch (error) {
this.statusLoading = false;
this.dialogConfirmStatusRequest = false;
this.showErrorAlert(true, error.response.data.message);
console.log(error.response.data);
}*/
},

openDialoStatusRequest(item) {
console.log("testando o itemSeleceted", item);
this.dialogConfirmStatusRequest = true;
this.selectedItem = item;
},

finishiProcess() {
this.loading = false;
this.alertError = false;
this.alertSuccess = false;
},

showErrorAlert(status, message) {
this.alertError = status;
this.alertMessage = message;
setTimeout(() => {
this.finishiProcess();
}, 8080);
},

showSuccessAlert(status, message) {
this.alertMessage = message;
this.alertSuccess = status;
setTimeout(() => {
this.finishiProcess();
}, 8080);
},
},

created() {
this.getAllStatusRequest();
},
});
