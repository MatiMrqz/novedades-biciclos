import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const { nombre, apellido, telefono, email, nroLegajo, rango, calle, numero, cp, localidad } = Object.fromEntries(formData.entries());

  try {
    const dir = await supabase
      .from('Direccion')
      .insert([
        { Calle: calle, Numero: numero||null, CP: cp, Localidad: localidad },
      ])
      .select('ID_Direccion')
    if (dir.error) throw dir.error
    const persona = await supabase
      .from('Persona')
      .insert([
        { Nombre: nombre, Apellido: apellido, Telefono: telefono, Email: email },
      ])
      .select('ID_Persona')
    if (persona.error) throw persona.error
    const oficial = await supabase
      .from('Oficial')
      .insert([
        { NroLegajo: nroLegajo, Rango: rango, ID_Persona: persona.data[0].ID_Persona, ID_Direccion: dir.data[0].ID_Direccion },
      ])
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