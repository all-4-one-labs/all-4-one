using UnityEngine;
namespace ca.HenrySoftware.Deko
{
    public static class Utility
	{
		public static class Random
		{
			static System.Random _random = new System.Random();
			public static int Next(int max)
			{
				return _random.Next(max);
			}
			public static int Next(int min, int max)
			{
				return _random.Next(min, max);
			}
			public static int NextEven(int min, int max)
			{
				return Next(min / 2, max / 2) * 2;
			}
			public static int NextOdd(int min, int max)
			{
				return Next(min, max) + 1;
			}
			public static double NextDouble()
			{
				return _random.NextDouble();
			}
			public static double NextDouble(double max)
			{
				return NextDouble() * max;
			}
			public static double NextDouble(double min, double max)
			{
				return min + NextDouble() * (max - min);
			}
			public static bool NextBool()
			{
				return NextDouble() > 0.5;
			}
			public static bool NextPercent(double target)
			{
				return NextDouble() < target;
			}
			public static Color NextColor()
			{
				return new Color((float)NextDouble(), (float)NextDouble(), (float)NextDouble());
			}
		}
	}
	public static class VectorExtensions
	{
		public static bool Approximately(this Vector2 p, Vector2 q)
		{
			return Mathf.Approximately(p.x, q.x) && Mathf.Approximately(p.y, q.y);
		}
		public static bool Approximately(this Vector3 p, Vector3 q)
		{
			return Mathf.Approximately(p.x, q.x) && Mathf.Approximately(p.y, q.y) && Mathf.Approximately(p.z, q.z);
		}
		public static Color GetColor(this Vector3 v)
		{
			return new Color(Mathf.Clamp01(v.x), Mathf.Clamp01(v.y), Mathf.Clamp01(v.z));
		}
		public static Color GetColor(this Vector4 v)
		{
			return new Color(Mathf.Clamp01(v.x), Mathf.Clamp01(v.y), Mathf.Clamp01(v.z), Mathf.Clamp01(v.w));
		}
	}
	public static class ColorExtensions
	{
		public static Vector3 GetVector3(this Color c)
		{
			return new Vector3(c.r, c.g, c.b);
		}
		public static Vector4 GetVector4(this Color c)
		{
			return new Vector4(c.r, c.g, c.b, c.a);
		}
		public static Color SetAlpha(this Color c, float a)
		{
			return new Color(c.r, c.g, c.b, a);
		}
	}
}
