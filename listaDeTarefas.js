Parse.serverURL = "https://parseapi.back4app.com/";

Parse.initialize(
    "7D86wCEebSkuoVvtjMWnBWh9mJMWYU0b8HGroLr9",
    "NCBptadPZoRAZ45oUVnU1jBw2EC7RdRx2MZWqrvW"
  );

  const Tarefa = Parse.Object.extend("Tarefa");

  const input = document.getElementById('inputt');
  const list = document.getElementById('listt');
  const postBt = document.getElementById('button');

    const createTask = async () => {

        const description = input.value.trim();
            if (!description) {
                alert("Digite uma descrição válida!");
            return;
            }

        const tarefa = new Parse.Object("Tarefa");

        tarefa.set("description", description);

        try {
          const result = await tarefa.save();
          console.log("Tarefa criada com sucesso. ID: ", result.id);
        } 
        catch (e) {
          console.error("Ocorreu um erro durante a criação da tarefa: ", e);
        }

        input.value = "";
        input.focus();
        showTask();

      };

      const showTask = async () => {

        const query = new Parse.Query(Tarefa);
        query.descending('createdAt'); //ordenar do mais novo pro mais antigo
        query.limit(10); // mostrar apenas os 10 primeiros resultados.

        try {
          const results = await query.find();
          list.innerHTML = "";

          for (const tarefa of results) {
            const description = tarefa.get("description");
            const done = tarefa.get("done");

            const tarefas = document.createElement('li');
            tarefas.classList.add('task');
            const conteudo = `<p class="content">${description}</p>`;            
            tarefas.innerHTML = conteudo;

            tarefas.appendChild(doneButton())
            tarefas.appendChild(deleteButton())
            list.appendChild(tarefas);
          }
        } 
        catch (e) {
          console.error("Ocorreu um erro na busca da tarefa: ", e);
        }
      };

      const doneButton = () => {
        const doneButton = document.createElement('button')
        doneButton.classList.add  ('check-button')
        doneButton.innerText = 'concluir'
        doneButton.addEventListener('click', doneTask) 
             
        return doneButton
        
    }

    const doneTask = (evento) =>{
        const doneButton = evento.target
        
        const completedTask = doneButton.parentElement
        
        completedTask.classList.toggle('done')
        doneButton.disabled = true;
    }

    const deleteButton = () =>{
        const deleteButton = document.createElement('button')
        deleteButton.classList.add('check-button')
        deleteButton.innerText = "deletar"
        deleteButton.addEventListener('click', deletarTarefa)
           
        return deleteButton
    }
    
    const deletarTarefa = (evento) =>{
        const deleteButton = evento.target
        
        const completedTask = deleteButton.parentElement
    
        completedTask.remove()
        return deleteButton
    }

      postBt.onclick = createTask;

      console.log('%c DESENVOLVIDO POR: TIAGO BRAGA FERNANDES, SIN0017 - UNICAP ','color:hsl(120, 100%, 60%);background-color:hsl(120, 100%, 25%);font-size: 22px;');
    

    


