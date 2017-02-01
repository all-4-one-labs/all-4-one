using UnityEngine;
namespace ca.HenrySoftware.Deko
{
	public class Singleton<T> : MonoBehaviour where T : MonoBehaviour
	{
		protected static T instance;
		public static T Instance
		{
			get
			{
				if (instance == null)
				{
					instance = FindObjectOfType(typeof(T)) as T;
					if (instance == null)
						Debug.LogError("Missing: " + typeof(T));
				}
				return instance;
			}
		}
	}
}
