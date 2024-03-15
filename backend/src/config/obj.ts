export default {
    obj: {
        message: "",
        data: [],
        error: false
    },
    setError(message: string) {
        this.obj.data = [];
        this.obj.message = message;
        this.obj.error = true;
    },
    setData(data: any){
        this.obj.data = data;
        this.obj.error = false;
        this.obj.message = "Requisição realizada com sucesso!"; 
    }
}