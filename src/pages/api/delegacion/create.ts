import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request,redirect }) => {
  const formData = await request.formData();
  const { nombre, calle, numero, cp, localidad, telefono } = Object.fromEntries(formData.entries());

  try {
    const dir = await supabase
      .from('Direccion')
      .insert([
        { Calle: calle, Numero: numero, CP: cp, Localidad: localidad },
      ])
      .select('ID_Direccion')
    if (dir.error) throw dir.error
    const del = await supabase
      .from('Delegacion')
      .insert([
        { Nombre: nombre, Telefono: telefono, ID_Direccion: dir.data[0].ID_Direccion },
      ])
    if (del.error) throw del.error
    return redirect("/delegaciones");
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};