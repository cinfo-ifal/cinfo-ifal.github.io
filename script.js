let dadosPlanilha = [];

async function lerArquivoCSV() {
  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS6f10KYx2Z5eF4DnLBzNDAZCi9B2m2WFPjgQDtGkqqLQcNYRcgN_rxLEIztUNdcpb7UjjZS3HA9icP/pub?gid=2110176679&single=true&output=csv");
    if (!response.ok) {
      throw new Error("Não foi possível carregar o arquivo CSV.");
    }
    const csvText = await response.text();
    const data = d3.csvParse(csvText);

    // Obtendo a data de atualização do cabeçalho HTTP
    const lastModified = response.headers.get('last-modified');
    let timestamp = document.getElementById("timestamp")
    if (lastModified) {
      timestamp.innerText('Data e hora de atualização: '+ lastModified);
    } else {
      console.log('Cabeçalho "last-modified" não encontrado.');
    }

    dadosPlanilha = data;
    preencherTabela(dadosPlanilha);
  } catch (error) {
    console.error("Erro:", error);
  }
}

function criarCelulaHorario(novaLinha, horario) {
  const horaCelula = novaLinha.insertCell();
  horaCelula.textContent =
    horario === "18:50"
      ? "18:50 às 20:30"
      : horario === "20:40"
        ? "20:40 às 22:20"
        : horario;
}

function criarCelulaAulas(celula, aulas) {
  aulas.forEach((aula) => {
    const divAula = document.createElement("div");
    divAula.textContent = `${aula.Professor} - ${aula.DISCIPLINA} (${aula.Laboratório}) (${aula.TURMA})`;
    divAula.classList.add(aula.Turno);
    celula.appendChild(divAula);
  });
}

function processarLinha(tabela, horario, dadosFiltrados, dias) {
  const novaLinha = tabela.insertRow();
  criarCelulaHorario(novaLinha, horario);

  dias.forEach((dia) => {
    const celula = novaLinha.insertCell();
    celula.setAttribute(
      "data-label",
      dia.charAt(0).toUpperCase() + dia.slice(1),
    );
    const aulas = dadosFiltrados.filter(
      (aula) =>
        aula.Dia === dia &&
        horario >= aula.hora_inicio &&
        horario < aula.hora_final,
    );
    criarCelulaAulas(celula, aulas);
  });
}

function preencherTabela(dadosFiltrados) {
  const tabela = document.getElementById("horarioTableBody");
  const thead = document.getElementById("horarioTableHead");
  if (!tabela) {
    console.error("Elemento 'horarioTableBody' não encontrado.");
    return;
  }

  tabela.innerHTML = ""; // Limpar a tabela antes de preencher
  const diasSemana = [
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
  ];
  const horarios = [
    "07:00",
    "07:50",
    "08:40",
    "09:50",
    "10:40",
    "11:30",
    "12:20",
    "13:00",
    "13:50",
    "14:40",
    "15:50",
    "16:40",
    "17:30",
    "18:20",
    "18:50",
    "20:40",
  ];
  const diaFiltro = document.getElementById("filtroDia").value;

  if (diaFiltro) {
    // Ocultar o cabeçalho fixo
    //thead.style.display = 'none';
    thead.removeChild(thead.children[0]);
    // Adicionar um cabeçalho dinâmico
    let theadDinamico = thead;
    let linhaCabecalho = theadDinamico.insertRow();
    linhaCabecalho.insertCell().outerHTML = "<th scope=col></th>"; // Célula vazia para os horários
    let celulaDia = (linhaCabecalho.insertCell().outerHTML =
      "<th scope=col>" +
      diaFiltro.charAt(0).toUpperCase() +
      diaFiltro.slice(1) +
      "</th>");

    horarios.forEach((horario) => {
      const novaLinha = tabela.insertRow();
      criarCelulaHorario(novaLinha, horario);

      const celula = novaLinha.insertCell();
      celula.setAttribute(
        "data-label",
        diaFiltro.charAt(0).toUpperCase() + diaFiltro.slice(1),
      );

      const aulas = dadosFiltrados.filter(
        (aula) =>
          aula.Dia === diaFiltro &&
          horario >= aula.hora_inicio &&
          horario < aula.hora_final,
      );
      criarCelulaAulas(celula, aulas);
    });

    tabela.parentNode.insertBefore(theadDinamico, tabela);
  } else {
    // Mostrar o cabeçalho fixo
    thead.style.display = "";

    thead.innerHTML =
      "<tr><th scope=col></th><th scope=col>Segunda-feira</th><th scope=col>Terça-feira</th><th scope=col >Quarta-feira</th><th scope=col >Quinta-feira</th><th scope=col >Sexta-feira</th></tr>";
    horarios.forEach((horario) => {
      processarLinha(tabela, horario, dadosFiltrados, diasSemana);
    });
  }
}

function aplicarFiltro(filtroId, filtroCampo) {
  const filtro = document.getElementById(filtroId).value;
  const dadosFiltrados = filtro
    ? dadosPlanilha.filter((aula) => aula[filtroCampo] === filtro)
    : dadosPlanilha;
  preencherTabela(dadosFiltrados);

  ["filtroProfessor", "filtroLaboratorio", "filtroTurma", "filtroDia"].forEach(
    (id) => {
      if (id !== filtroId) {
        document.getElementById(id).disabled = !!filtro;
      }
    },
  );
}

function filtrarPorLab() {
  aplicarFiltro("filtroLaboratorio", "Laboratório");
}

function filtrarPorTurma() {
  aplicarFiltro("filtroTurma", "TURMA");
}

function filtrarPorProfessor() {
  aplicarFiltro("filtroProfessor", "Professor");
}

function filtrarPorDia() {
  aplicarFiltro("filtroDia", "Dia");
}

window.onload = lerArquivoCSV;
