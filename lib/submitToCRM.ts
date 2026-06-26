export const submitToCRM = (params: Record<string, string>) => {
  const payload = {
    api_token: 'a98af636848d6ab8cc8ca2d19541e47b',
    contact_name: params.contact_name || '',
    contact_email: params.contact_email || '',
    contact_phone: params.contact_phone || '',
    contact_source: params.contact_source || 'BC Hospitality Deals Website',
    '{%contact.which_p_wshrbo%}': params['which_p_wshrbo'] || '',
    '{%contact.buyer_profile__ajl%}': params['buyer_profile__ajl'] || '',
    '{%contact.purchase_budget__tsm%}': params['purchase_budget__tsm'] || '',
    '{%contact.when_ar_jlvatx%}': params['when_ar_jlvatx'] || '',
    '{%contact.are_you_qnylji%}': params['are_you_qnylji'] || '',
    '{%contact.additio_ewnbhy%}': params['additio_ewnbhy'] || '',
  }

  fetch(
    'https://admin.goeasyai.ca/api/automations/6a3c38944792f/execute',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  ).catch(() => {})
}
