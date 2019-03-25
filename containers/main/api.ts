
export default function apiRequests(state: any) {

  const API_URL: string = 'https://api.identityfront.com/v0/';

  function getTicket() {
    return fetch(`${API_URL}tickets`, {
      method: 'GET',
    })
      .then(res => res.json());
  }

  function createApplicant(res: any) {
    return fetch(`${API_URL}applicants`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Ticket ${res.ticket}`,
      },
      body: window.JSON.stringify(state.value),
    })
      .then(res => res.json());
  }

  function handleRequest(res: any, id?: string) {
    const evidence: any = [];

    for (const type of state.checkboxes) {
      if (type != null) {
        evidence.push({ type });
      }
    }

    return fetch(`${API_URL}validations`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Ticket ${res.ticket}`,
      },
      body: window.JSON.stringify({
        evidence,
        lifetime: 1800000,
        applicant: id,
        returnURL: `https://localhost:4000?ticket=${res.ticket}`,
        attachedDescription: `${state.commentValue}`,
      }),
    })
      .then((res) => {
        if (!res.ok) throw res;

        return res.json();
      })
      .then(res => window.location.href = res.url);
  }

  function getStarted() {
    if (state.showEmailField) {
      return getTicket()
        .then((ticket: any) => {
          return createApplicant(ticket)
            .then((data: any) => handleRequest(ticket, data.id));
        });
    }

    return getTicket()
      .then((res: any) => handleRequest(res));

  }

  return (getStarted());
}
