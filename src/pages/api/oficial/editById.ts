import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const { id, nombre, apellido, telefono, email, nroLegajo, rango, calle, numero, cp, localidad, idDireccion } = Object.fromEntries(formData.entries());
  try {
    const dir = await supabase
      .from('Direccion')
      .update({ Calle: calle, Numero: numero, CP: cp, Localidad: localidad })
      .eq('ID_Direccion', idDireccion)
    if (dir.error) throw dir.error
    const persona = await supabase
      .from('Persona')
      .update({ Nombre: nombre, Apellido: apellido, Telefono: telefono, Email: email })
      .eq('ID_Persona', id)
    if (persona.error) throw persona.error
    const oficial = await supabase
      .from('Oficial')
      .update({ NroLegajo: nroLegajo, Rango: rango})
      .eq('ID_Persona', id)
    if (oficial.error) throw oficial.error
    return redirect("/oficiales");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};