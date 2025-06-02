import { supabase } from "../../../lib/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const { id, nombre, calle, numero, cp, localidad, telefono, idDireccion } = Object.fromEntries(formData.entries());
  console.log({ id, nombre, calle, numero, cp, localidad, telefono, idDireccion })
  try {
    const dir = await supabase
      .from('Direccion')
      .update({ Calle: calle, Numero: numero, CP: cp, Localidad: localidad })
      .eq('ID_Direccion', idDireccion)
    if (dir.error) throw dir.error
    const del = await supabase
      .from('Delegacion')
      .update({ Nombre: nombre, Telefono: telefono})
      .eq('NroDelegacion', id)
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